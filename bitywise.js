

class Bitywise {
    constructor( totalSize ) { 
        //debugger
        this.packingSize    = 8; 
        this.completeChunks = Math.floor( totalSize / this.packingSize ) 
        this.padding        = totalSize - ( this.completeChunks * this.packingSize )
        this.actualStorageChunks = this.completeChunks;
        if ( this.padding > 0 ) 
            this.actualStorageChunks++;

        this.storage        = new Uint8Array( this.actualStorageChunks )
        this.storageView    = new DataView( this.storage.buffer );
    }
    get( index ) { 
        //debugger
        const chunkIndex  = Math.floor( index / this.packingSize );
        const chunkData   = this.storageView.getUint8( chunkIndex );
        const bitPosition = index % this.packingSize;
        
        const returnValue = this.bitValue( bitPosition, chunkData );
        if ( ( returnValue == 1 ) || ( returnValue == 0 ) ) { 
            return returnValue;
        }
        else {
            debugger
        }
    }
    set( index, value ) { 
        //debugger
        const chunkIndex  = Math.floor( index / this.packingSize )
        const chunkData   = this.storageView.getUint8( chunkIndex );
        const bitPosition = index % this.packingSize;

        if ( ( value == 0 ) ) {
            const shiftedValue = this.invmask( bitPosition );
            const newValue     = shiftedValue & chunkData;
            this.storageView.setUint8( chunkIndex, newValue )

        }
        else if ( ( value == 1 ) ) {
            const shiftedValue = this.mask( bitPosition );
            const newValue     = shiftedValue | chunkData;
            this.storageView.setUint8( chunkIndex, newValue )
            console.log( `setting value to ${newValue} from ${chunkData} `);
            // const maskedValue  = shiftedValue | 
        }
        else {
            throw " invalid " 
        }
    }
    static mask( bitPosition ) {
        switch ( bitPosition ) {
            case 0 : return 0b10000000;
            case 1 : return 0b01000000;
            case 2 : return 0b00100000;
            case 3 : return 0b00010000;
            case 4 : return 0b00001000;
            case 5 : return 0b00000100;
            case 6 : return 0b00000010;
            case 7 : return 0b00000001;
        }
    }
    static invmask( bitPosition ) {
        switch ( bitPosition ) {
            case 0 : return 0b01111111;
            case 1 : return 0b10111111;
            case 2 : return 0b11011111;
            case 3 : return 0b11101111;
            case 4 : return 0b11110111;
            case 5 : return 0b11111011;
            case 6 : return 0b11111101;
            case 7 : return 0b11111110;
        }
    }

    static bitValue( bitPosition, inputValue ) {
        switch ( bitPosition ) {
            case 0 : return ( inputValue & this.mask(0) ) / 0b10000000;
            case 1 : return ( inputValue & this.mask(1) ) / 0b01000000;
            case 2 : return ( inputValue & this.mask(2) ) / 0b00100000;
            case 3 : return ( inputValue & this.mask(3) ) / 0b00010000;
            case 4 : return ( inputValue & this.mask(4) ) / 0b00001000;
            case 5 : return ( inputValue & this.mask(5) ) / 0b00000100;
            case 6 : return ( inputValue & this.mask(6) ) / 0b00000010;
            case 7 : return ( inputValue & this.mask(7) ) / 0b00000001;
        }
    }

}