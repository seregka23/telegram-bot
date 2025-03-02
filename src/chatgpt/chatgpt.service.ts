import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, of } from 'rxjs';

interface GptAnswer {
    choices: {
        message: {
            content: string
        }
    }[]
}

@Injectable()
export class ChatgptService {
    private readonly logger = new Logger(ChatgptService.name);
    private gptUrl;
    private apiKey;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.gptUrl = "https://api.openai.com/v1/chat/completions";
        this.apiKey = this.configService.get('GPT_API');
    }

    generateResponse(content: string): Observable<string> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`
        }

        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'user', content }
            ]
        }

        return this.httpService.post<GptAnswer>(this.gptUrl, data, { headers }).pipe(
            map(({ data }) => data.choices[0].message.content.trim()),
            catchError((err) => {
                this.logger.log(err);
                return of("There was error!")
            })
        )
    }
}
