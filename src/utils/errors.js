export class canNotBeVoid extends Error{
    constructor(message){
        super(message);
        this.name = 'CanNotBeVoid';
    }
};
export class canNotBeCero extends Error{
    constructor(message){
        super(message);
        this.name = 'CanNotBeCero';
    }
};
export class canNotBeNegative extends Error{
    constructor(message){
        super(message);
        this.name = 'CanNotBeNegative';
    }
};
export class canNotBeNaN extends Error{
    constructor(message){
        super(message);
        this.name = 'CanNotBeNaN';
    }
};