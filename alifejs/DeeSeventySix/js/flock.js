// Based on https://codepen.io/grrrwaaa/pen/PozWpvG

"use strict";

class BirdAgent {

	constructor() {
		this.pos = new vec2(random(), random());
        this.vel = vec2.random(1/400);
        this.acc = new vec2(0, 0);
        this.size = 1/100 + random()/80;
        this.neighbours = [];
	}

}


class Flock {

	constructor(_numAgents) {
		this.numAgents = _numAgents;

        this.nearby_range = 1/20;
        this.field_of_view = Math.PI/3;

        this.max_speed = 1/5;
        this.max_acceleration = 0.2;
        this.inertia = 0.99;

        this.randomwalk_factor = 0.0006 * 60;
        this.cohesion_factor = 0.2 ;
        this.alignment_factor = 1.5 ;
        this.avoidance_factor = 0.5 ;
        this.collision_distance_factor = 10000;

        this.traces_decay = 0.95;

        this.isShowingAgents = false;

        this.agents = [];
        for (let i = 0; i < this.numAgents; i++) {
            this.agents.push(new BirdAgent());
        }
	}

	update(dt) {
        for (let a of this.agents) {
            let force = new vec2();
            a.neighbours = [];

            // who is near?;
            for (let b of this.agents) {
                // don't test against self;
                if (a == b) continue;
                // get relative vector to neighbour;
                let rel = b.pos.clone().sub(a.pos);
                rel.relativewrap();
                rel.rotate(-a.vel.angle());
                // are a and b near?;
                let d = a.pos.distance(b.pos) - a.size/2 - b.size/2;
                if (d <= 0) {
                	// we're touching!;
                	a.neighbours.push(b);
                } else if (d < this.nearby_range) {
                	if (Math.abs(rel.angle()) < this.field_of_view) {
                    	// we're visible!;
                    	a.neighbours.push(b);
                	}
                }
            }

            // add a cohesive force ("centering"):;
            if (a.neighbours.length > 0) {
                // compute average position of neighbours:;
                let cohesion = new vec2();
                for (let b of a.neighbours) {
                	cohesion.add(b.pos) ;
                }
                cohesion.scale(1/a.neighbours.length);
                // make it relative to me:;
                cohesion.sub(a.pos);
                // add this as an *attractive* force;
                force.add(cohesion.scale(this.cohesion_factor));
            }

            // add an alignment force ("copy"):;
            for (let b of a.neighbours) {
                // compute average *velocity* of neighbours:;
                let alignment = new vec2();
                for (let b of a.neighbours) {
                	alignment.add(b.vel);
                }
                alignment.scale(1/a.neighbours.length);
                
                // this is our "desired velocity";
                // subtract our current velocity to get the desired acceleration:;
                alignment.sub(a.vel);
                // scale this down to limit the effect / spread over time:;
                force.add(alignment.scale(this.alignment_factor));
            }

            // add an avoidance force:;
            for (let b of a.neighbours) {
                // add a 'force' that points away from neigbour;
                let rel = a.pos.clone().sub(b.pos).relativewrap();
                let d = Math.max(rel.len() - a.size/2 - b.size/2, 0);
                // compute collision avoidance according to distance:;
                rel.len( 1/(1+d*this.collision_distance_factor) );
                // average over neighbours:;
                rel.scale(1/a.neighbours.length);

                force.add(rel.scale(this.avoidance_factor));
            }

            // add some random walk:;
            force.add(vec2.random(this.randomwalk_factor));

            // integrate force to velocity to position:;
            a.acc.scale(this.inertia);
            a.acc.add(force);
            a.acc.limit(this.max_acceleration);
            a.vel.add(a.acc.clone().scale(dt));
            a.vel.limit(this.max_speed);
            a.pos.add(a.vel.clone().scale(dt)).wrap(1);
            
            traces.deposit(1, a.pos);
        }
	}

	draw() {
        for (let a of this.agents) {
        	draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
            draw2D.hsl(0.5);
            
            //draw2D.circle();
            if (this.isShowingAgents) draw2D.triangle(1, 0.5);
            draw2D.pop();
            
            // draw links:;
            for (let b of a.neighbours) {
                //if (a.pos.distance(b.pos) < 0.5) draw2D.line(a.pos, b.pos);
            }
        }
	}

}