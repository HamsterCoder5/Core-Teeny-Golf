import { canvas, ctx } from "./setup.js";

export default class Ball {
  constructor(x, y, radius, velX, velY, friction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velX = velX;
    this.velY = velY;
    this.friction = friction;
  }

  isMoving() {
    return (this.velX != 0 || this.velY != 0);
  }

  handleObstacleCollision(obstacle, steps) {
    let closestX = Math.max(obstacle.x, Math.min(this.x, obstacle.x + obstacle.width));
    let closestY = Math.max(obstacle.y, Math.min(this.y, obstacle.y + obstacle.height));
    let dx = this.x - closestX;
    let dy = this.y - closestY;
    
    // pythagoras, getting the distance between the point and the circle
    let distanceSquared = (dx * dx) + (dy * dy);
    if (distanceSquared < this.radius * this.radius) {
      // if the distance to the X is lower than the distance to the Y then
      if (Math.abs(dx) < Math.abs(dy)) {
        this.velY *= -1;
        this.y += this.velY / steps;
      }else {
        this.velX *= -1;
        this.x += this.velX / steps;
      }
    }
  }

  move(obstacles) {
    this.velX *= this.friction;
    this.velY *= this.friction;
  
    if (Math.abs(this.velX) < 0.01) this.velX = 0;
    if (Math.abs(this.velY) < 0.01) this.velY = 0;
  
    // Break movement into small steps
    const steps = 5; // More steps = more accurate, less performance
    for (let s = 0; s < steps; s++) {
      const stepX = this.velX / steps;
      const stepY = this.velY / steps;
  
      this.x += stepX;
      this.y += stepY;
  
      if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
        this.velX *= -1;
        this.x += this.velX / steps;
      }
  
      if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
        this.velY *= -1;
        this.y += this.velY / steps;
      }
      
  
      for (let i = 0; i < obstacles.length; i++) {
        this.handleObstacleCollision(obstacles[i], steps);
      }
    }
  }
  
  draw(isHovered) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + ((isHovered && !this.isMoving()) ? 5 : 0), 0, 2 * Math.PI);
    ctx.fillStyle = this.isMoving() ? "rgb(231, 222, 206)" : "rgb(255, 254, 185)";
    ctx.fill();
    ctx.stroke();
  }
};