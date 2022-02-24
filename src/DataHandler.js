/* class DataHandler {
    constructor() {
        this.origem = '';
        this.destino = '';
        this.dataIda = '';
        this.assento = '';
        this.viagemID = 0;
        this.assentoID = 0;
        this.accessToken = '';
        this.refreshToken = '';
        this.userID = '';
    };

    getOrigem() {
        return this.origem;
    };

    setOrigem(origem){
        this.origem = origem;
    };

    getDestino() {
        return this.destino;
    };

    setDestino(destino){
        this.destino = destino;
    };

    getDataIda() {
        return this.dataIda;
    };

    setDataIda(dataIda){
        this.dataIda = dataIda;
    };

    getAccessToken() {
        return this.accessToken;
    };

    setAccessToken(accessToken){
        this.accessToken = accessToken;
    };

    getRefreshToken() {
        return this.refreshToken;
    };

    setRefreshToken(refreshToken){
        this.refreshToken = refreshToken;
    };

    getUserID() {
        return this.userID;
    };

    setUserID(userID){
        this.userID = userID;
    };
}

export default DataHandler; */

export default function DataHandler(){
    global.origem = '';
    global.destino = '';
    global.dataIda = '';
    global.assento = '';
    global.viagemID = 0;
    global.assentoID = 0;
    global.token = '';
    global.refresh = '';
}