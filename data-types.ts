export type Comment = {
  id: string;
  likesCount: number;
  owner: Owner;
  ownerProfilePicUrl: string;
  ownerUsername: string;
  replies: Comment[];
  repliesCount: number;
  text: string;
  timestamp: string;
};

export type Owner = {
  id: string;
  is_verified: boolean;
  username: string;
  profile_pic_url: string;
};

export type MusicInfo = {
  artist_name: string;
  audio_id: string;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  song_name: string;
  uses_original_audio: boolean;
};

export type Reel = {
  alt: string;
  caption: string;
  childPosts: Reel[];
  commentsCount: number;
  dimensionsHeight: number;
  dimensionsWidth: number;
  displayUrl: string;
  firstComment: string;
  hashtags: string[];
  id: string;
  images: string[];
  inputUrl: string;
  isCommentsDisabled: boolean;
  isSponsored: boolean;
  latestComments: Comment[];
  likesCount: number;
  mentions: string[];
  musicInfo: MusicInfo;
  ownerFullName: string;
  ownerId: string;
  ownerUsername: string;
  productType: string;
  shortCode: string;
  timestamp: string;
  type: string;
  url: string;
  videoDuration: number;
  videoPlayCount: number;
  videoUrl: string;
  videoViewCount: number;
};
