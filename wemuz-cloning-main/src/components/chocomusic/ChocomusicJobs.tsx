import styled from "styled-components";
import media from "../../lib/styles/media";
import palette from "../../lib/styles/palette";
import jobspage1 from "../../static/imgs/chocomusic/jobspage1.png";
import jobspage2 from "../../static/imgs/chocomusic/jobspage2.png";
import jobspagemob1 from "../../static/imgs/chocomusic/jobspagemob1.png";
import jobspagemob2 from "../../static/imgs/chocomusic/jobspagemob2.png";

export type ChocomusicJobsProps = {
    active: boolean;
};

function ChocomusicJobs(props: ChocomusicJobsProps) {
    const { active } = props;
    return (
        <Block>
            <Img active={active}></Img>
        </Block>
    );
}

const Block = styled.div`
    height: 100%;
    background-color: ${palette.red1};
`;

const Img = styled.div<{ active: boolean }>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: ${({ active }) => (active ? `url(${jobspage2})` : `url(${jobspage1})`)};
    ${media.mobile} {
        background-image: ${({ active }) =>
            active ? `url(${jobspagemob2})` : `url(${jobspagemob1})`};
    }
`;

export default ChocomusicJobs;
