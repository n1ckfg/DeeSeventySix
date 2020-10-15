"use strict";

const numAgents = 10000;
const depositChance = 0.98;
const debugAgents = false;
const deathCounter = 10000;

let agents = [];

class Agent {
    
    constructor() {
        //this.pos = new vec2(0.5, 0.5);
        this.pos = new vec2(Math.random(), Math.random());
        this.vel = new vec2(0.1, 0);
        this.size = 0.03;
        this.sense = 0;
        this.memory = 0;
        this.turnfactor = 0.1;
        this.movefactor = 0.2;
        this.depositor = random() < depositChance;
        this.lifetime = 0;
    }
    
}

function setupAgents() {
    agents = [];
    for (let i=0; i<numAgents; i++) {
        agents.push(new Agent());
    }    
}

function updateAgents(dt) {
    // simulation code here
    for (let agent of agents) {
        agent.sense = darkroom.destField.sample(agent.pos);
        
        if (agent.sense > agent.memory) {
            // drift when in a good area
            agent.movefactor = 0.01;
            agent.turnfactor = 3.9;
        } else {
            // swim away when in a bad area
            agent.movefactor = 0.5;
            agent.turnfactor = 0.1;
        }
        
        agent.memory = agent.sense;             
        agent.vel
            .len(random() * agent.movefactor)
            .rotate((random() - 0.5) * agent.turnfactor);
        agent.pos.add(agent.vel.clone().mul(dt));
        agent.pos.wrap(1);
        
        agent.lifetime++;
        if (agent.depositor) {
            if (agent.lifetime < deathCounter) darkroom.destField.update(agent.sense, agent.pos);
        } else {
            darkroom.destField.update(0, agent.pos);            
        }
    }
}

function drawAgents() { 
    for (let agent of agents) {
        draw2D.push();
        draw2D.translate(agent.pos).rotate(agent.vel.angle()).scale(agent.size);
        draw2D.circle();
        draw2D.color("red");
        draw2D.circle([0.3, 0.3], 0.4 * agent.sense);
        draw2D.circle([0.3, -0.3], 0.4 * agent.sense);
        draw2D.pop();
    }
}


