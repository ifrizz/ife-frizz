# Command-line Box

## Command
Type commands in the command editor to control the robot box:
* `GO X`: move X steps forward</p>
* `TUN [LEF | RIG | BAC]`: Turn left/right/back</p>
* `TRA [LEF | TOP | RIG | BOT] X`: Move X steps toward specified direction</p>
* `MOV [LEF | TOP | RIG | BOT] X`: Turn to specified direction and move X steps</p>
* `BIUD`: Build a wall on the front grid</p>
* `BRU #color`: Color the front grid</p>
* `MOV TO X,Y [DFS | BFS | BEST | A*]`: Move to target position with specified path-finding algorithm</p>

## Path Finding
Support the following path finding algorithms: 
* DFS
* BFS
* Best-First Search
* A*

## Structure
![class-diagram](/036-xic-box4/img/class_diagram.png)

## Workflow
![sequence-diagram](/036-xic-box4/img/sequence_diagram.png)
