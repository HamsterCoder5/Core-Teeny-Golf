function generateDebugGrid(spacing = 100) {
  const obstacles = [];
  const gridSize = 600;

  for (let x = 0; x < (gridSize/spacing) + 1; x++) {
    for (let y = 0; y < (gridSize/spacing) + 1; y++) {
      obstacles.push({
        x: spacing * x,
        y: spacing * y,
        width: 20,
        height: 20,
      })
    }
  }
  return obstacles;
}

const levels = [
  {
    name: "Level 1",
    ballX: 160,
    ballY: 500,
    holeX: 500,
    holeY: 160,
    obstacles: [
      { x: 0, y: 0, height: 600, width: 20 },
      { x: 300, y: 300, height: 300, width: 300 },
      { x: 580, y: 0, height: 600, width: 20 },
      { x: 0, y: 0, height: 20, width: 600 },
      { x: 0, y: 580, height: 20, width: 600 }
    ],
  },
  {
    name: "Level 2",
    ballX: 100,
    ballY: 100,
    holeX: 540,
    holeY: 540,
    obstacles: [

      // Interior blocks
      { x: 150, y: 150, width: 300, height: 200 },

      // A horizontal blocker near the hole
      { x: 400, y: 480, width: 200, height: 20 },
    ]
  },
  {
    name: "Level 3",
    ballX: 80,
    ballY: 80,
    holeX: 520,
    holeY: 520,
    obstacles: [
      { x: 100, y: 100, width: 400, height: 20 },
      { x: 100, y: 100, width: 20, height: 400 },
      { x: 480, y: 100, width: 20, height: 400 },
      { x: 100, y: 480, width: 400, height: 20 },
    ],
  },
  {
    name: "Level 4",
    ballX: 300,
    ballY: 550,
    holeX: 300,
    holeY: 50,
    obstacles: [
      { x: 140, y: 200, width: 320, height: 20 },
      { x: 140, y: 380, width: 320, height: 20 },
      { x: 140, y: 200, width: 20, height: 200 },
      { x: 440, y: 200, width: 20, height: 200 },
    ],
  },
  {
    name: "Level 5",
    ballX: 300,
    ballY: 500,
    holeX: 300,
    holeY: 100,
    obstacles: [
      { x: 200, y: 100, width: 20, height: 400 },
      { x: 380, y: 100, width: 20, height: 400 },
      { x: 220, y: 280, width: 160, height: 20 },
    ],
  },
  {
    name: "Level 6",
    ballX: 100,
    ballY: 300,
    holeX: 500,
    holeY: 300,
    obstacles: [
      { x: 200, y: 100, width: 20, height: 400 },
      { x: 380, y: 100, width: 20, height: 400 },
      { x: 220, y: 100, width: 160, height: 20 },
      { x: 220, y: 480, width: 160, height: 20 },
    ],
  },
  {
    name: "Level 7",
    ballX: 100,
    ballY: 500,
    holeX: 500,
    holeY: 100,
    obstacles: [
      { x: 250, y: 0, width: 20, height: 240 },
      { x: 330, y: 360, width: 20, height: 240 },
      { x: 250, y: 300, width: 100, height: 10 },
    ],
  },
  {
    name: "Level 8",
    ballX: 60,
    ballY: 300,
    holeX: 540,
    holeY: 300,
    obstacles: [
      { x: 200, y: 250, width: 200, height: 20 },
      { x: 200, y: 330, width: 200, height: 20 },
      { x: 200, y: 250, width: 20, height: 100 },
      { x: 380, y: 250, width: 20, height: 100 },
    ],
  },
  {
    name: "Level 9",
    ballX: 100,
    ballY: 100,
    holeX: 500,
    holeY: 500,
    obstacles: [
      { x: 150, y: 150, width: 300, height: 20 },
      { x: 150, y: 150, width: 20, height: 300 },
      { x: 150, y: 430, width: 300, height: 20 },
      { x: 430, y: 150, width: 20, height: 300 },
    ],
  },
  {
    name: "Level 10",
    ballX: 300,
    ballY: 300,
    holeX: 300,
    holeY: 100,
    obstacles: [
      { x: 260, y: 180, width: 80, height: 20 },
      { x: 270, y: 400, width: 60, height: 20 },
      { x: 200, y: 200, width: 20, height: 200 },
      { x: 380, y: 200, width: 20, height: 200 },
    ],
  }
]

export default levels;