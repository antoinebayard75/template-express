import {UserId} from "../../../../src/domain/users/id/userId";

describe("UserID", ()=>{
    it("Generate two id, they should be differents", ()=>{
        const id : string = UserId.generate().toString();
        const other_id : string = UserId.generate().toString();
        expect(id).not.toEqual(other_id);
    })
})