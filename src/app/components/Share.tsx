'use client'
import { 
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share';
import { Share2, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

export default function SocialShare({ 
  url, 
  title, 
  description = '', 
  hashtags = [],
  className = '' 
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url;
  const shareTitle = title;
  const shareDescription = description;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const iconSize = 32;
  const iconProps = {
    size: iconSize,
    round: true,
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Share Header */}
      <div className="flex items-center gap-2 text-slate-700">
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share this article</span>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Twitter/X */}
        <TwitterShareButton
          url={shareUrl}
          title={shareTitle}
          hashtags={hashtags}
          className="hover:scale-110 transition-transform"
        >
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton
          url={shareUrl}
          title={shareTitle}
          summary={shareDescription}
          className="hover:scale-110 transition-transform"
        >
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>

        {/* Facebook */}
        <FacebookShareButton
          url={shareUrl}
          hashtag={hashtags.length > 0 ? `#${hashtags[0]}` : undefined}
          className="hover:scale-110 transition-transform"
        >
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>

        {/* WhatsApp */}
        <WhatsappShareButton
          url={shareUrl}
          title={shareTitle}
          className="hover:scale-110 transition-transform"
        >
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>

        {/* Telegram */}
        <TelegramShareButton
          url={shareUrl}
          title={shareTitle}
          className="hover:scale-110 transition-transform"
        >
          <TelegramIcon {...iconProps} />
        </TelegramShareButton>

        {/* Email */}
        <EmailShareButton
          url={shareUrl}
          subject={shareTitle}
          body={shareDescription}
          className="hover:scale-110 transition-transform"
        >
          <EmailIcon {...iconProps} />
        </EmailShareButton>

        
    {/* Copy Link Button */}
    <button
      onClick={copyToClipboard}
      className={`w-[32px] h-[32px] rounded-full bg-slate-700 flex items-center justify-center hover:scale-110 transition-transform`}
    >
      {copied ? (
        <Check className="w-5 h-5 text-white" />
      ) : (
        <Link2 className="w-5 h-5 text-white" />
      )}
    </button>
      </div>

    </div>
  );
}