module.exports = class UserDto {
    email;
    id;
    name;
    groupId;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.name = model.name;
        this.groupId = model.groupId
    }
}