export type ContentsResponse = {
    contentId: string,
    author: string,
    name: string,
    avt: string,
    media: string,
    description: string,
    payment: {
        option1: PaymentOption | null,
        option2: PaymentOption | null,
        option3: PaymentOption | null,
    },
}

type PaymentOption = {
    days: number,
    price: number,
}

export type LicensesResponse = {

}