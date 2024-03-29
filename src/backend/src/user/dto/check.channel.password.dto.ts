import * as validator from 'class-validator';

export class CheckChannelPasswordDto {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 25)
  password: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(3, 25)
  @validator.Matches(/^[a-zA-Z0-9]+$/)
  @validator.IsLowercase()
  channel_name: string;
}
