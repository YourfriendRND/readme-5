import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { 
    EMAIL_IS_EMPTY, 
    EMAIL_NOT_VALID, 
    FIRST_NAME_IS_EMPTY, 
    LAST_NAME_IS_EMPTY 
} from '../email-subscriber.constant';

export class CreateSubscriberDTO {
    
    @IsEmail({}, {message: EMAIL_NOT_VALID })
    @IsNotEmpty({ message: EMAIL_IS_EMPTY })
    public email: string;

    @IsString()
    @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
    public firstName: string;

    @IsString()
    @IsNotEmpty({ message: LAST_NAME_IS_EMPTY })
    public lastName: string;

}
