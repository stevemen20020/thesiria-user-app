import { SingularUserEntity } from "./SingularUser.Entity";

export interface UserEntity {
    user:SingularUserEntity,
    token?:string
}