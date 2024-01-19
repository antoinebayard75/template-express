import SupportedMedia from "../../../src/domain/media/supportedMedia";

describe("SupportedMedia", () => {
    const supportedMedia = new SupportedMedia();
    const MAX_FILE_SIZE_SUPPORTED = 1024 * 1024 * 10; // 10MB

    it("Given a too big file, it should not be supported", () => {
        const tooBigSize = MAX_FILE_SIZE_SUPPORTED + 1;
        expect(supportedMedia.supportSize(tooBigSize)).toBeFalsy();
    });

    it("Given a supported file size, it should be supported", () => {
        const supportedSize = MAX_FILE_SIZE_SUPPORTED;
        expect(supportedMedia.supportSize(supportedSize)).toBeTruthy();
    });

    it("Given a supported mimetype, it should be supported", () => {
        const supportedMimetype = "image/jpeg";
        expect(supportedMedia.supportFormat(supportedMimetype)).toBeTruthy();
    });

    it("Given a not supported mimetype, it should not be supported", () => {
        const supportedMimetype = "image/webp";
        expect(supportedMedia.supportFormat(supportedMimetype)).toBeFalsy();
    });
});