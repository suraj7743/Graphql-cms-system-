import { ClassType, Field, Int, ObjectType } from "type-graphql";

export default function Response<T>(TItemClass: ClassType<T>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass {
    @Field((type) => TItemClass)
    data: T;

    @Field((type) => Boolean)
    success:boolean;

    @Field((type) =>String)
    message:string;

   
  }
  return ResponseClass;
}