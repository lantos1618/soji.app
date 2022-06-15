export async function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;


        reader.onload = (e) => {
            if (!e){
               return reject("Error: No file loaded")
            }
            if(!e.target){
                return reject("Error: No file loaded")
            }
            // typescript is fun :)
            if (typeof e.target.result === 'string' || e.target.result instanceof String ) {
                return resolve(e.target.result as string)
            }
            return reject("Error: No file loaded")
        }
        reader.readAsDataURL(file);
    });
}

export async function toBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => {
            if (!e){
               return reject("Error: No file loaded")
            }
            if(!e.target){
                return reject("Error: No file loaded")
            }

            if (e.target.result instanceof ArrayBuffer) {
                return resolve(e.target.result)
            }
            return reject("Error: No file loaded")
        }
        reader.readAsArrayBuffer(file);
    });
}
