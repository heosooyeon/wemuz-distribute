import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NewLine from "../../../components/common/NewLine";
import SupportStatement from "../../../components/common/SupportStatement";
import { MainContainer } from "../../../components/global/GlobalStyles";
import PageTemplate from "../../../components/global/PageTemplate";
import { MyPageHeading1 } from "../../../components/myPage/MyPageStyles";
import SupportDetailFundingInfo from "../../../components/myPage/supporter/SupportDetailFundingInfo";
import SupportDetailPaymentInfo from "../../../components/myPage/supporter/SupportDetailPaymentInfo";
import fonts from "../../../lib/styles/fonts";
import media from "../../../lib/styles/media";
import palette from "../../../lib/styles/palette";
import useSupportDetail from "../hooks/useSupportDetail";
import Loader from "../../../components/common/Loader";
import useUserxx from "../../../lib/hooks/useUserxx";
import { toast } from "react-toastify";
import { cancelPayment } from "../../../lib/api/payment/api";
import { handleAxiosError } from "../../../lib/utils";
import useToggle from "../../../lib/hooks/useToggle";
import RefundPolicyPopup from "../../../components/common/RefundPolicyPopup";

import { ReactComponent as QnaIco } from "../../../static/icons/global/ico_qna.svg";
import SupportDetailCancelPopup from "../../../components/myPage/supporter/SupportDetailCancelPopup";

export type SupportDetailProp = {};

function SupportDetail(props: SupportDetailProp) {
    const { supportDetail, initSupportDetail, loading } = useSupportDetail();
    const [cancelPopupOpen, toggleCancelPopupOpen] = useToggle(false);
    const [refundPopupOpen, toggleRefundPopupOpen] = useToggle(false);
    const navigate = useNavigate();
    const user = useUserxx();

    useEffect(() => {
        initSupportDetail();
    }, []);

    if (loading || !supportDetail)
        return (
            <PageTemplate>
                <Loader.Container>
                    <Loader />
                </Loader.Container>
            </PageTemplate>
        );

    const {
        fundingId,
        fundingTitle,
        fundingHost,
        fundingState,
        fundingEndDate,
        packagesTotalCount,
        supportedPackages,
        paymentId,
        paymentCreatedDate,
        paymentScheduledDate,
        paymentMethod,
        paymentPrice,
        paymentState,
        paymentRefundCause,
        paymentRefundAmount,
        paymentRefundTime,
        paymentCancelCause,
        paymentCancelTime,
    } = supportDetail;

    const isPerformanceFinished = (performanceDate: string) => {
        const nowDateTime = new Date().getTime();
        const performanceDateTime = new Date(performanceDate).getTime();

        return nowDateTime > performanceDateTime;
    };

    const getSupportedFundingState = () => {
        if (fundingState === "running") {
            switch (paymentState) {
                case "payment_scheduled":
                    return "running_a";
                case "payment_schedule_cancelled":
                    return "running_b";
            }
        }

        if (fundingState === "failed") {
            switch (paymentState) {
                case "payment_scheduled":
                    return "failed_a";
                case "payment_schedule_cancelled":
                    return "failed_b";
            }
        }

        if (fundingState === "succeeded") {
            const samplePerformanceDate = "2022-08-09T16:18:22.662202";
            if (isPerformanceFinished(samplePerformanceDate)) {
                switch (paymentState) {
                    case "payment_completed":
                        return "performace_finished_c";
                    case "payment_refund":
                        return "performace_finished_e";
                }
            } else {
                switch (paymentState) {
                    case "payment_scheduled":
                        return "performace_scheduled_a";
                    case "payment_schedule_cancelled":
                        return "performace_scheduled_b";
                    case "payment_completed":
                        return "performace_scheduled_c";
                    case "payment_fail":
                        return "performace_scheduled_d";
                    case "payment_refund":
                        return "performace_scheduled_e";
                }
            }
        }

        if (fundingState === "cancelled") {
            switch (paymentState) {
                case "payment_schedule_cancelled":
                    return "cancelled_b";
                case "payment_refund":
                    return "cancelled_e";
            }
        }
    };

    const onCancelPaymentClick = () => {
        if (!user) return;
        const { accessKey } = user;

        toast
            .promise(
                async () => {
                    await cancelPayment({
                        accessKey,
                        fundingId,
                        cause: "?????? ??????",
                    });
                },
                {
                    pending: "?????? ?????? ????????? ????????? ?????????.",
                    error: "?????? ?????? ????????? ????????? ????????? ????????? ?????? ????????? ???????????? ???????????????.",
                    success: "?????? ?????? ????????? ??????????????? ?????????????????????.",
                }
            )
            .then(() => {
                navigate("/my-page/supporter/supports");
            })
            .catch((e) => {
                handleAxiosError(e);
                toggleCancelPopupOpen();
            });
    };

    const supportedFundingState = getSupportedFundingState();

    return (
        <PageTemplate>
            <StyledMainContainer>
                <SupportDetailQna>
                    <MyPageHeading1>?????? ?????? ??????</MyPageHeading1>
                    <QnaContainer>
                        <p>
                            ????????? ?????? ????????????????{" "}
                            <NewLine device={["MOBILE"]} />
                            ???????????? ????????? ??????????????? ????????? ????????????.
                        </p>
                        <QnaBtn href={process.env.REACT_APP_QNA_URL}>
                            <StyledQnaIco /> ??????
                        </QnaBtn>
                    </QnaContainer>
                </SupportDetailQna>
                <SupportDetailFundingInfo
                    title={fundingTitle}
                    musician={fundingHost}
                    state={fundingState}
                    endDate={fundingEndDate}
                />
                <StyledSupportStatement
                    totalPackagesCount={packagesTotalCount}
                    priceAmount={paymentPrice}
                    packages={supportedPackages}
                    headerText={"?????? ??????"}
                />
                <SupportDetailPaymentInfo
                    paymentId={paymentId}
                    createdDate={paymentCreatedDate}
                    scheduledDate={paymentScheduledDate}
                    method={paymentMethod}
                    price={paymentPrice}
                    supportedFundingState={supportedFundingState as string}
                    paymentState={paymentState}
                    fundingEndDate={fundingEndDate}
                    toggleCancelPopupOpen={toggleCancelPopupOpen}
                    refundTime={paymentRefundTime}
                    refundCause={paymentRefundCause}
                    refundAmount={paymentRefundAmount}
                    cancelTime={paymentCancelTime}
                    cancelCause={paymentCancelCause}
                />
                <RefundTerms>
                    <p>
                        ????????? ????????? ???????????? ?????? ???????????? ?????? ????????? ?????????
                        ????????? ??? ????????????.
                    </p>
                    <RefundTermsBtn onClick={toggleRefundPopupOpen}>
                        ?????? ?????? ????????????
                    </RefundTermsBtn>
                </RefundTerms>
                <SupportDetailCancelPopup
                    open={cancelPopupOpen}
                    toggleOpen={toggleCancelPopupOpen}
                    onClick={onCancelPaymentClick}
                />
                <RefundPolicyPopup
                    open={refundPopupOpen}
                    toggleOpen={toggleRefundPopupOpen}
                />
                <PrevPageBtn to="../supports">???????????? ????????????</PrevPageBtn>
            </StyledMainContainer>
        </PageTemplate>
    );
}

const StyledMainContainer = styled(MainContainer)`
    ${media.mobile} {
        padding: 40px 0 120px;
    }
`;

const SupportDetailQna = styled.div`
    ${media.mobile} {
        padding: 0 20px;
    }
`;

const QnaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 58px;
    background-color: ${palette.white2};
    border-radius: 4px;
    padding: 0 12px 0 20px;
    margin-top: 28px;

    p {
        ${fonts.size.scale16};
        ${fonts.lineHeight.scale16};
        color: ${palette.gray0};
    }

    ${media.mobile} {
        height: auto;
        background: none;
        padding: 0;
        margin-top: 13px;
    }
`;

const QnaBtn = styled.a`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 88px;
    font-size: 16px;
    background-color: ${palette.white2};
    border: 0.5px solid ${palette.gray0};
    border-radius: 4px;
    padding: 8px 18px 8px 12px;
    transition: 0.2s background-color;

    &,
    &:link,
    &:visited {
        color: ${palette.gray0};
    }

    &:hover {
        background-color: ${palette.white0};
    }

    ${media.mobile} {
        width: 48px;
        flex-direction: column;
        font-size: 12px;
        background-color: ${palette.white0};
        padding: 4px 0 6px;
    }
`;

const StyledQnaIco = styled(QnaIco)`
    ${media.mobile} {
        width: 20px;
        height: 20px;
    }
`;

const StyledSupportStatement = styled(SupportStatement)`
    margin-top: 72px;

    ${SupportStatement.SupportedPackageList} {
        padding: 12px 32px;
    }

    ${SupportStatement.SupportedPackageItem} {
        padding: 28px 0 28px 20px;
    }

    ${SupportStatement.SupportedPackageItem} + ${SupportStatement.SupportedPackageItem} {
        border-top: 1px solid ${palette.gray5};
    }

    ${SupportStatement.PackageDetails} {
        .name {
            color: ${palette.black0};

            &:before {
                background-color: ${palette.black0};
            }
        }
    }

    ${SupportStatement.PackagePrice} {
        .amount {
            color: ${palette.gray0};
            font-weight: ${fonts.weight.regular};
        }
    }

    ${SupportStatement.TotalAmount} {
        font-size: ${fonts.size.scale18}
        color: ${palette.black0};
        padding: 28px 31px;
    }

    ${media.mobile} {
        margin-top: 60px;

        ${SupportStatement.SupportedPackageList} {
            padding: 8px 20px;
        }

        ${SupportStatement.SupportedPackageItem} {
            padding: 20px 0;
        }

        ${SupportStatement.TotalAmount} {
            padding: 20px 20px 19px;
        }

        ${SupportStatement.PackagePrice} {
            .amount {
                margin-top: 20px;
            }
        }
    }
`;

const RefundTerms = styled.div`
    padding: 0 31px;
    margin-top: 24px;

    p {
        ${fonts.size.scale16}
        ${fonts.lineHeight.scale16}
        position: relative;
        color: ${palette.gray0};

        &:before {
            content: "???";
            position: absolute;
            left: -20px;
            top: 1px;
            display: inline-block;
        }
    }

    ${media.mobile} {
        padding: 0 20px 0 36px;
        margin-top: 16px;

        p {
            &:before {
                left: -16px;
                top: 0;
            }
        }
    }
`;

const RefundTermsBtn = styled.button`
    ${fonts.size.scale16}
    color: ${palette.purple0};
    border-bottom: 1px solid ${palette.purple0};
    padding: 1px 0;
    margin-top: 6px;
`;

const PrevPageBtn = styled(Link)`
    ${fonts.size.scale18}
    display: block;
    width: 200px;
    color: ${palette.white0};
    text-align: center;
    border-radius: 4px;
    background-color: ${palette.purple0};
    padding: 16px 0;
    margin: 120px auto 0;

    ${media.mobile} {
        width: 146px;
        padding: 12px 0;
        margin: 48px auto 0;
    }
`;

const StyledLoader = styled(Loader)`
    padding: 200px 0;
    margin: 0 auto;
`;

export default SupportDetail;
