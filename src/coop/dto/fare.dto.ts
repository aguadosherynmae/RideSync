import { IsInt, IsEnum, IsString, isNotEmpty, IsNotEmpty } from 'class-validator';

export class FareDto {

    @IsString()
    @IsNotEmpty()
    route: String;

    @IsInt()
    @IsNotEmpty()
    amount: number;
}
