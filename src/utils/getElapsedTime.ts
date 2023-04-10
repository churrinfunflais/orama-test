const getElapsedTime = (startTime: number) => {
    const timeDifference = new Date().getTime() - startTime;

    const elapsedSeconds = Math.floor((timeDifference / 1000) % 60);
    const elapsedMinutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const elapsedHours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);

    const secondsString = elapsedSeconds.toString().padStart(2, '0');
    const minutesString = elapsedMinutes.toString().padStart(2, '0');
    const hoursString = elapsedHours.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}`;
};

const getElapsedMinutes = (startTime: number) => {
    const timeDifference = new Date().getTime() - startTime;
    const elapsedMinutes = Math.floor(timeDifference / 1000 / 60);

    return elapsedMinutes;
};

const getElapsedHours = (startTime: number) => {
    const timeDifference = new Date().getTime() - startTime;
    const elapsedHours = Math.floor(timeDifference / 1000 / 60 / 60);
    return elapsedHours;
};

const getElapsedSeconds = (startTime: number) => {
    const timeDifference = new Date().getTime() - startTime;
    const elapsedSeconds = Math.floor(timeDifference / 1000);
    return elapsedSeconds;
};

export {
    getElapsedTime,
    getElapsedMinutes,
    getElapsedHours,
    getElapsedSeconds,
};
