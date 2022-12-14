import styled from "styled-components";
import media from "../../lib/styles/media";
import palette from "../../lib/styles/palette";
import kakaoimg from "../../static/imgs/chocomusic/kakaoimg.png";
import blogimg from "../../static/imgs/chocomusic/blogimg.png";
import instaimg from "../../static/imgs/chocomusic/instaimg.png";
import kakaomobimg from "../../static/imgs/chocomusic/kakaomobimg.png";
import blogmobimg from "../../static/imgs/chocomusic/blogmobimg.png";
import instamobimg from "../../static/imgs/chocomusic/instamobimg.png";

export type ChocomusicFooterProps = {};

function ChocomusicFooter(props: ChocomusicFooterProps) {
    return (
        <Block>
            <FooterTitle>Contact Us</FooterTitle>
            <Text>
                <Address>주소</Address>
                <AddressText>부산광역시 금정구 부산대학로63번길 2 제6공학관 6104-2</AddressText>
                <AddressText2>부산광역시 금정구 부산대학로63번길 2, 제6공학관 6104-2</AddressText2>
                <Call>전화</Call>
                <CallText>070-8064-0774</CallText>
                <Email>이메일</Email>
                <EmailText>wemuzmusic@gmail.com</EmailText>
            </Text>
            <ImgLink>
                <Kakaotalk></Kakaotalk>
                <Blog></Blog>
                <Instagram></Instagram>
            </ImgLink>
            <ImgMobLink>
                <Kakaomobimg></Kakaomobimg>
                <Blogmobimg></Blogmobimg>
                <Instamobimg></Instamobimg>
            </ImgMobLink>
        </Block>
    );
}

const Block = styled.div`
    background-color: ${palette.black0};
    height: 442px;

    ${media.mobile} {
        background-color: ${palette.black0};
        height: 348px;
    }
`;

const FooterTitle = styled.div`
    width: 150px;
    height: 36px;
    font-size: 27px;
    font-weight: bolder;
    color: white;
    position: relative;
    top: 120px;
    left: 188px;
    ${media.mobile} {
        width: 89px;
        height: 28px;
        font-size: 17px;
        font-weight: bolder;
        position: relative;
        top: 60px;
        left: 40px;
    }
`;

const Text = styled.div`
    width: 506px;
    height: 94px;
    position: relative;
    left: 188px;
    line-height: 34px;
    transform: translateY(150%);
    ${media.mobile} {
        position: relative;
        left: 40px;
        line-height: 20px;
        top: -50px;
    }
`;

const Address = styled.div`
    font-size: 18px;
    color: ${palette.gray3};
    float: left;
    ${media.mobile} {
        font-size: 14px;
        color: ${palette.gray3};
        float: left;
    }
`;

const AddressText = styled.div`
    width: 500px;
    font-size: 18px;
    color: ${palette.gray3};
    position: relative;
    left: 34px;
    ${media.mobile} {
        display: none;
        width: 231px;
        position: relative;
        left: 25px;
    }
`;

const AddressText2 = styled.div`
    display: none;
    ${media.mobile} {
        width: 245px;
        height: 44px;
        font-size: 14px;
        color: ${palette.gray3};
        position: relative;
        left: 25px;
        display: flex;
        text-align: left;
        line-height: 22px;
    }
`;

const Call = styled.div`
    font-size: 18px;
    color: ${palette.gray3};
    float: left;
    ${media.mobile} {
        font-size: 14px;
        color: ${palette.gray3};
        float: left;
        line-height: 48px;
    }
`;

const CallText = styled.div`
    font-size: 18px;
    color: ${palette.gray3};
    position: relative;
    left: 34px;
    ${media.mobile} {
        width: 245px;
        height: 44px;
        font-size: 14px;
        color: ${palette.gray3};
        position: relative;
        left: 25px;
        display: flex;
        text-align: left;
        line-height: 48px;
    }
`;

const Email = styled.div`
    font-size: 18px;
    color: ${palette.gray3};
    float: left;
    ${media.mobile} {
        font-size: 14px;
        color: ${palette.gray3};
        float: left;
        margin-left: -26px;
    }
`;

const EmailText = styled.div`
    font-size: 18px;
    color: ${palette.gray3};
    position: relative;
    left: 16px;
    ${media.mobile} {
        width: 245px;
        height: 44px;
        font-size: 14px;
        color: ${palette.gray3};
        position: relative;
        left: 12px;
        display: flex;
        text-align: left;
        line-height: 22px;
    }
`;

const ImgLink = styled.div`
    width: 188px;
    height: 60px;
    position: relative;
    float: right;
    margin: 0 188px;
    transform: translateY(100%);
    display: flex;
    flex-direction: row;
`;

const Kakaotalk = styled.div`
    width: 40px;
    height: 40px;
    background-size: cover;
    background-image: url(${kakaoimg});
    margin: 10px;
    ${media.mobile} {
        display: none;
    }
`;

const Blog = styled.div`
    width: 40px;
    height: 40px;
    background-size: cover;
    background-image: url(${blogimg});
    margin: 10px;
    ${media.mobile} {
        display: none;
    }
`;

const Instagram = styled.div`
    width: 40px;
    height: 40px;
    background-size: cover;
    background-image: url(${instaimg});
    margin: 10px;
    ${media.mobile} {
        display: none;
    }
`;

const ImgMobLink = styled.div`
    ${media.mobile} {
        width: 132px;
        height: 28px;
        position: relative;
        transform: translateY(-530%);
        left: 222px;
        float: right;
        margin: 0 222px;
        display: flex;
        flex-direction: row;
    }
`;

const Kakaomobimg = styled.div`
    ${media.mobile} {
        width: 24px;
        height: 24px;
        background-size: cover;
        background-image: url(${kakaomobimg});
        margin: 5px;
    }
`;

const Blogmobimg = styled.div`
    ${media.mobile} {
        width: 24px;
        height: 24px;
        background-size: cover;
        background-image: url(${blogmobimg});
        margin: 5px;
    }
`;

const Instamobimg = styled.div`
    ${media.mobile} {
        width: 24px;
        height: 24px;
        background-size: cover;
        background-image: url(${instamobimg});
        margin: 5px;
    }
`;

export default ChocomusicFooter;
