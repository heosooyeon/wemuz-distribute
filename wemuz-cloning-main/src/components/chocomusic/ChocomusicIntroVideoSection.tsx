import { useEffect, useRef } from "react";
import styled from "styled-components";
import media from "../../lib/styles/media";
import palette from "../../lib/styles/palette";
import S1 from "../../static/imgs/chocomusic/S1mobile.png";

export type ChocomusicIntroVideoSectionProps = {};

function ChocomusicIntroVideoSection(props: ChocomusicIntroVideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.volume = 0;
        videoRef.current.play();
    }, []);

    return (
        <Block>
            <BackgroundVideo autoPlay muted playsInline loop src="/video.mp4"></BackgroundVideo>
            <Img></Img>
        </Block>
    );
}

const Block = styled.section`
    height: 100%;
    background-color: ${palette.black0};
`;

const BackgroundVideo = styled.video`
    margin-top:0px;
    width: 100%;
    ${media.mobile}{
        display : none;
    }
`;

const Img = styled.div`
    display : none;
   ${media.mobile}{
        display : block;
        z-index : 8;
        width: 100%;
        height : 100%;
        background-size : cover;
        background-image : url(${S1});
   }
`

export default ChocomusicIntroVideoSection;
