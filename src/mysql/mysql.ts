import mysql = require('mysql');

export default class Mysql{

    private static _instance: Mysql;

    cnn: mysql.Connection; 
    conectado: boolean = false; 

    constructor(){

        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });  

        this.conectarBD();   
        
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    static ejecutarQuery( query: string, callback: Function ){

        this.instance.cnn.query( query, (err, res: Object[], fields ) =>{

            if(err){
                console.log('Error en el Query');
                console.log(err);
                return callback(err);
            }

            if(res.length === 0){
                return callback('El registro solicitado no existe');
            }
                
            return callback(null, res);

        });
    }

    private conectarBD(){

        this.cnn.connect( (err: mysql.MysqlError ) =>{
        
            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true; 
            console.log('BDD ONLINE');
            
        });
    }
}