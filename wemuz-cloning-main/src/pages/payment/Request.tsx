import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loader from "../../components/common/Loader";
import { MainContainer } from "../../components/global/GlobalStyles";
import { requestPayment } from "../../lib/api/payment/api";
import useUser from "../../lib/hooks/useUser";
import fonts from "../../lib/styles/fonts";
import palette from "../../lib/styles/palette";
import { formatAccessKey, handleAxiosError } from "../../lib/utils";

export type RequestProp = {
    setPaymentResult: React.Dispatch<any>;
    isPaymentFinished: boolean;
};

function Request(props: RequestProp) {
    const { setPaymentResult, isPaymentFinished } = props;
    const user = useUser();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fundingId = searchParams.get("funding_id");
    const merchantUid = searchParams.get("merchant_uid");
    const isImpSucceeded = searchParams.get("imp_success");
    // const testIsDeliverable: boolean = true;

    useEffect(() => {
        const formatPaymentResult = (response: any) => {
            const fundingInfo = response.funding.funding_info;
            const hostInfo = response.funding.funding_info.fundinghost_info;
            const paymentInfo = response.payment;
            return {
                funding: {
                    id: fundingInfo.id,
                    title: fundingInfo.title,
                    thumbnail: fundingInfo.thumbnail,
                    hostAlias: hostInfo.host_name,
                    hostPhoto: hostInfo.introduction_photo,
                    hostBio: hostInfo.bio,
                    placeName: fundingInfo.performance_stage_name,
                    performanceDate: fundingInfo.funding_performance_date,
                    likeCount: fundingInfo.number_of_likes,
                    isLiked: fundingInfo.is_liked,
                },
                payment: {
                    orderNum: response.funding.sequence_of_support,
                    amounts: paymentInfo.payment_amounts,
                    pg: paymentInfo.pg,
                    scheduledPaymentDate: paymentInfo.schedule_at,
                },
            };
        };

        const requestCreatingPayment = async (
            fundingId: string,
            paymentPostData: any
        ) => {
            const accessKey = formatAccessKey(user.accessToken);
            await requestPayment({
                accessKey,
                fundingId,
                paymentInfo: paymentPostData,
            })
                .then((res) => {
                    if (!res.data.payment)
                        throw new Error(
                            "[Wrong Response] - Payment data doesn't exist"
                        );
                    const nextPaymentResult = formatPaymentResult(res.data);
                    setPaymentResult(nextPaymentResult);
                    navigate(`../result`);
                    toast.success("??????????????? ??????????????????.");
                })
                .catch((e) => {
                    handleAxiosError(e);
                    toast.warning(
                        "??????????????? ?????? ??? ????????? ???????????? ??????????????? ?????????????????????."
                    );
                    navigate(`/detail/${fundingId}`);
                });
        };

        if (!user) {
            toast.warning("????????? ??? ???????????? ??????????????????.");
            navigate("/login");
            return;
        }

        if (!merchantUid || !fundingId) {
            toast.warning("??????????????? ????????????. ?????? ????????? ????????? ?????????.");
            navigate("/");
            return;
        }

        if (isPaymentFinished) {
            navigate(`/detail/${fundingId}`);
            return;
        }

        const paymentSessionItem = sessionStorage.getItem(`mid_${merchantUid}`);
        if (!paymentSessionItem) {
            toast.warning("??????????????? ????????????. ?????? ????????? ????????? ?????????.");
            navigate(`/detail/${fundingId}`);
            return;
        }
        const paymentPostData = JSON.parse(paymentSessionItem);
        requestCreatingPayment(fundingId, paymentPostData);
    }, []);

    return (
        <RequestBlock>
            <Container>
                <StyledLoader />
                <h1>??????????????? ?????? ????????????.</h1>
            </Container>
        </RequestBlock>
    );
}

const RequestBlock = styled(MainContainer)`
    display: grid;
    place-content: center;
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        ${fonts.size.scale22}
        font-weight: ${fonts.weight.bold};
        color: ${palette.gray0};
        margin-top: 40px;
    }
`;

const StyledLoader = styled(Loader)``;

export default Request;
