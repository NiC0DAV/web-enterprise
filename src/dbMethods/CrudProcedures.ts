import { CrudProcess, MongoId } from '../utils/dataTypes';

interface CrudStrategy {
    execute(id: MongoId, data: any): any;
}

class CreateStrategy implements CrudStrategy {
    execute(id: MongoId, data: any): any {
        console.log("Entraste el Create");
    }
}

class UpdateStrategy implements CrudStrategy {
    execute(id: MongoId, data: any): any {
        // Lógica para actualizar un registro en la base de datos
        console.log("Entraste el update");
    }
}

class CrudProcedures {
    private strategy!: CrudStrategy;

    constructor() {

    }

    setStrategy(strategy: CrudStrategy) {
        this.strategy = strategy;   
    }

    executeCrudProcedure(process: CrudProcess, id: MongoId, data: any): any {
        return this.strategy.execute(id, data);
    }
}

export default CrudProcedures;
