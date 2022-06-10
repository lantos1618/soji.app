export async function ToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e: any) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}
