class Log{
    constructor(){
        this.log = [];
    };

    async fetchLogData(){
        try{
            const response = await fetch('http://localhost:3000/log/getLogs');
            const logs = await response.json();

            this.log = logs;
        } catch(error) {
            console.error('Error fetching logs: ', error);
        }
    };

    getLogs(){
        return this.log;
    };
};

export default Log;