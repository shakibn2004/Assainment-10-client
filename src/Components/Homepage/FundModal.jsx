'use client'
import React, { useState } from "react";
import {
    Modal,
    Button,
    Input,
    useOverlayState,
} from "@heroui/react";

export default function FundModal() {
    // In v3, useOverlayState replaces useDisclosure
    const state = useOverlayState({ defaultOpen: false });


    return (
        <div className="flex items-center justify-center p-4">
            {/* Trigger button just for demonstration */}
            <Button onPress={state.open} className="bg-[#E60023] hover:bg-red-700 transition-colors text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm" >
                Give Fund
            </Button>

            {/* v3 Modal Structure */}
            <Modal state={state}>
                <Modal.Backdrop className="bg-[#81858E]/70 backdrop-blur-sm">
                    <Modal.Container>
                        {/* By omitting <Modal.CloseTrigger />, we hide the close button to match the design */}
                        <Modal.Dialog className="bg-black/70 rounded-[2.5rem] max-w-md w-full p-0 shadow-2xl">
                            {({ close }) => (
                                <>
                                    <form action={'/api/checkout'} method="POST">
                                        <Modal.Header className="flex flex-col gap-3 items-center text-center pt-10 pb-4 px-6 border-none">
                                            <Modal.Heading className="text-2xl sm:text-[26px] font-black text-white tracking-tight">
                                                Make a Contribution
                                            </Modal.Heading>
                                            <p className="text-[#64748B] font-medium text-[15px] leading-relaxed">
                                                Enter the amount you wish to donate to support our
                                                lifesaving operations.
                                            </p>
                                        </Modal.Header>

                                        <Modal.Body className="py-2 px-6  border-none">
                                            <Input
                                                type="number"
                                                name="amount"
                                                placeholder="0.00"
                                                className='w-full h-full text-3xl font-bold'
                                            />
                                        </Modal.Body>

                                        <Modal.Footer className="flex flex-col gap-2 pt-6 pb-8 px-8 border-none">
                                            <Button
                                                className="w-full bg-[#EF234B] hover:bg-[#D91A3E] text-white font-bold text-lg h-14 rounded-2xl shadow-[0_8px_20px_rgba(239,35,75,0.25)] transition-transform active:scale-[0.98]"
                                                type="submit"
                                            >
                                                Confirm & Pay
                                            </Button>
                                            <Button
                                                variant="light"
                                                className="w-full text-[#8492A6] hover:text-[#475569] font-bold text-base h-12 rounded-xl transition-colors"
                                                onPress={close}
                                            >
                                                Maybe later
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </>
                            )}
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}