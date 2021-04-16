const draw = (id, canvas, bufferLength, dataArray, ctx) => {
    console.log(id);

    switch(id){
        case 1: drawVisualizationOne(canvas, bufferLength, dataArray, ctx); break;
        case 2: drawVisualizationTwo(canvas, bufferLength, dataArray, ctx); break;
        case 3: drawVisualizationThird(canvas, bufferLength, dataArray, ctx); break;
        case 4: drawVisualizationForth(canvas, bufferLength, dataArray, ctx); break;
        default: drawVisualizationOne(canvas, bufferLength, dataArray, ctx); break;
    }
}

const drawVisualizationOne = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let posX = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] + 140) * 2;
                ctx.fillStyle = 'chocolate';
                ctx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                posX += barWidth + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const drawVisualizationTwo = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let posX = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] + 140) * 2;
                ctx.fillStyle = 'blue';
                ctx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                posX += barWidth + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const drawVisualizationThird = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let posX = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] + 140) * 2;
                ctx.fillStyle = 'red';
                ctx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                posX += barWidth + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const drawVisualizationForth = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let posX = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] + 140) * 2;
                ctx.fillStyle = 'blue';
                ctx.fillRect(posX, canvas.height - barHeight / 2, 10, 5);
                posX += barWidth + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default draw;