import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@project/shared/types';

export class UserTokensRDO implements Token {

    @Expose()
    @ApiProperty({
        description: 'The uniq id of blog user',
        type: String,
        example: '664188b1dc09fc77e1f4b048'
    })
    public id!: string;

    @Expose()
    @ApiProperty({
        description: 'The user access token for requests to close part of application',
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWVhMjMxMmYzZjZmNTVmMzg4MjQ2YiIsImVtYWlsIjoia3VrdWhhQG1haWwuY29tIiwibGFzdE5hbWUiOiLQmtGD0LrRg9GI0LrQuNC90LAiLCJmaXJzdE5hbWUiOiLQotC-0LzQsNGA0LAiLCJpYXQiOjE3MTc4MzA4OTYsImV4cCI6MTcxNzg3NDA5Nn0.ndeC6qNADbEePXmwyrnHTM2IjeXV9TDWbHrQUQyxJh4'
    })
    public accessToken!: string;

    @Expose()
    @ApiProperty({
        description: 'The user refresh token for receiving new access token',
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWVhMjMxMmYzZjZmNTVmMzg4MjQ2YiIsImVtYWlsIjoia3VrdWhhQG1haWwuY29tIiwibGFzdE5hbWUiOiLQmtGD0LrRg9GI0LrQuNC90LAiLCJmaXJzdE5hbWUiOiLQotC-0LzQsNGA0LAiLCJ0b2tlbklkIjoiZTg3NjUyZDEtNWQyNC00YzZhLWFiMGMtN2Q2ZThlZmQ4MjZiIiwiaWF0IjoxNzE3ODMwNjA1LCJleHAiOjE3MTgyNjI2MDV9.50vKwwKxdc45-iBcqNZ5Vpkvp1lx8BfxCtTZ62Dr69I'
    })
    public refreshToken!: string;
}
