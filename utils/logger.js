import kleur from 'kleur';

/*
    DRAGON[RED]     -> SUPER HIGH LEVEL -> FATAL ERROR
    MAMBA [BLACK]   -> VERY HIGH LEVEL  -> NON FATAL ERROR
    BEE   [ORANGE]  -> WARNING INFO LOGS
    ANT   [YELLOW]  -> GOOD LOGS
*/

const timeNow = () => {
    return new Date().toLocaleString();
};

class loggerClass {
    constructor(filepath) {
        this.filepath = filepath.split("\\");
        this.filepath = this.filepath[this.filepath.length - 1];
    }


    success(message) {
        const messageFormat = `Success Info >> ${timeNow()} >> ${this.filepath} >> ${message}`;
        console.log(
            kleur.bgGreen().black().bold(messageFormat),
        );
    }

    info(message) {
        const messageFormat = `Info >> ${timeNow()} >> ${this.filepath} >> ${message}`;
        console.log(
            kleur.bgYellow().black().bold(messageFormat),
        );
    }

    warning(message) {
        const messageFormat = `Warning >> ${timeNow()} >> ${this.filepath} >> ${message}`;
        console.log(
            kleur.bgMagenta().bold(messageFormat),
        );
    }

    error(message, level) {
        if (!level) {
            level = "high";
        }
        const messageFormat = `Error(${level}) >> ${timeNow()} >> ${this.filepath} >> ${message}`;
        console.log(
            kleur.bgRed().black().bold(messageFormat),
        );
    }

    cron(message) {
        const messageFormat = `Cron >> ${timeNow()} >> ${this.filepath} >> ${message}`;
        console.log(
            kleur.bgBlue().black().bold(messageFormat),
        );
    }

}

const mylogger = (filepath) => {
    return new loggerClass(filepath);
};


export default mylogger;
