import {
    Post, Controller, Res,Body
  } from 'routing-controllers';
  import { OpenAPI } from 'routing-controllers-openapi';
 const client = require("@mailchimp/mailchimp_marketing");

 const md5 = require("md5")

  
@Controller('/subscribe')
export default class SubscribeController {
    @Post('/')
    @OpenAPI({ description: 'signup for subscribers', })

    async signup(@Body() body: any, @Res() response: any) {

      client.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_NAME,
      });

      const { email } = body
      const tags: any = ["subscribe", "ok"];

      const subscriberHash = md5(email.toLowerCase());
      const listId = process.env.MAILCHIMP_LIST_ID;

      const result = await client.lists.setListMember(
        listId,
        subscriberHash,
        {
          email_address: email,
          status_if_new: 'subscribed',
        }
      );

      const existingTags = result.tags.map((tag: any) => tag.name);
      const allUniqueTags = [...new Set([...existingTags, ...tags])];
      const formattedTags = allUniqueTags.map((tag) => {
        return {
          name: tag, 
          status: 'active',
        };
      });

      const updateSubscriberTags = await client.lists.updateListMemberTags(
        listId,
        subscriberHash,
        {
          body: {
            tags: formattedTags,
          },
        }
      );
      return response.message = "Thanks for subscribing!"      
    } 
}