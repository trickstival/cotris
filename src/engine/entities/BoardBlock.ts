
interface BoardBlockOptions {
    scene: Phaser.Scene
    size: number
    color: number
    borderColor: number
    x: number
    y: number
}

export class BoardBlock extends Phaser.GameObjects.Graphics {
    private isFilled = false
    constructor (private options: BoardBlockOptions) {
        super(options.scene)
        this.draw()
    }

    private draw () {
        const { x, y, size, borderColor } = this.options
        this.beginPath()
            .lineStyle(2, borderColor)
            .fillStyle(this.options.color)
            .strokeRect(
                x,
                y,
                size,
                size
            )
            .fillRect(
                x,
                y,
                size,
                size
            )
    }

    public fillWith (color: number) {
        this.options.color = color
        this.draw()
    }
}
