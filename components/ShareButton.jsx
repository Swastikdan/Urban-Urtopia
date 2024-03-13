
import { RWebShare } from 'react-web-share';

const ShareButton = ({ title, text, url , children }) => {
  return (
    <RWebShare
      data={{
        text: text,
        title: title,
        url: url,
      }}
    >
   {children}
    </RWebShare>
  );
};
export default ShareButton;
