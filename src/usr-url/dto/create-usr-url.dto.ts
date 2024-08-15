import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsrUrlDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    longUrl: string;
}

export class AddUrlDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    longUrl: string;
}