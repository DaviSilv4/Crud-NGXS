export interface MessageModel{
  body: string;
  campaignCode: string;
  groupSupport: string;
  isCampaign: boolean;
  isSmtp: boolean;
  destinations: Destinations[];
  messageType: string;
  _id: string;
}

interface Destinations {
  jsonLogic: string;
  url: string;
}
