export default class SupportedMedia{
    private readonly supportedMedia : string[] = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'application/pdf'
    ];
    private readonly maxFileSize : number = 1024 * 1024 * 10; // 10MB

    supportFormat(mimetype : string) : boolean {
        return this.supportedMedia.includes(mimetype);
    }

    supportSize(size : number) : boolean {
        return size <= this.maxFileSize;
    }
}
