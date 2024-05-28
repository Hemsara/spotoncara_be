import { Injectable } from '@nestjs/common';
import * as OneSignal from '@onesignal/node-onesignal';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OnesignalService {
  private client: OneSignal.DefaultApi;

  constructor(private readonly prisma: PrismaService) {
    const appKey = process.env.ONE_SIGNAL_APP_KEY;

    const configuration = OneSignal.createConfiguration({
      authMethods: {
        rest_api_key: {
          tokenProvider: {
            getToken: () => appKey,
          },
        },
      },
    });

    this.client = new OneSignal.DefaultApi(configuration);
  }

  async sendMessage(contents: { en: string }, ids: string[]) {
    const notification = new OneSignal.Notification();
    notification.app_id = process.env.ONE_SIGNAL_APP_ID;
    notification.contents = contents;
    notification.include_aliases = {
      external_id: ids,
    };
    notification.target_channel = 'push';

    try {
      const response = await this.client.createNotification(notification);

      if (response.errors == null) {
        const data = ids.map((id) => ({
          DvrPk: BigInt(id),
          NotificationText: contents['en'],
        }));

        await this.prisma.tbl_DriverNotifications.createMany({
          data: data,
        });
      }

      return response.errors;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Could not send notification');
    }
  }
}
