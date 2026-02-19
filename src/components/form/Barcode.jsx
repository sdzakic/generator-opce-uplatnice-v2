import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BarcodePayment from '../../lib/BarcodePayment';
import PDF417 from '../../lib/pdf417-min';
import { nalog2params } from '../../lib/paymentParamsFacade';

export const Barcode = ({ nalogId }) => {
    const canvasRef = useRef(null);
    const nalog = useSelector(state => state.nalog.nalozi.find(n => n.id === nalogId) || {});
    const params = nalog2params(nalog);
    const encodedText = BarcodePayment.GetEncodedText(params);

    // Debug logging
    useEffect(() => {
        const validationResult = BarcodePayment.ValidatePaymentParams(params);
        if (validationResult !== BarcodePayment.ValidationResult.OK) {
            console.log('Validation failed!', validationResult);
            console.log('Params:', params);

            // Log specific errors
            for (const [key, val] of Object.entries(BarcodePayment.ValidationResult)) {
                if ((validationResult & val) === val && val !== 0) {
                    console.error(`Validation Error: ${key}`);
                }
            }
        }
    }, [params]);

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (encodedText === BarcodePayment.ResultCode.InvalidContent) {
            showError(canvas, 'Sadržaj forme nije ispravan!', '2D kod ne može biti generiran!');
            return;
        } else if (encodedText === BarcodePayment.ResultCode.InvalidObject || !encodedText) {
            showError(canvas, 'Pri generiranju 2D koda', 'došlo je do tehničke greške!');
            return;
        }


        // Barcode generation - use imported PDF417 module
        if (PDF417) {
            PDF417.init(encodedText);
            var barcode = PDF417.getBarcodeArray();

            // block sizes (width and height) in pixels
            var bw = 2;
            var bh = 2;

            canvas.width = bw * barcode['num_cols'];
            canvas.height = bh * barcode['num_rows'];

            var ctx = canvas.getContext('2d');
            // graph barcode elements
            var y = 0;
            // for each row
            for (var r = 0; r < barcode['num_rows']; ++r) {
                var x = 0;
                // for each column
                for (var c = 0; c < barcode['num_cols']; ++c) {
                    if (barcode['bcode'][r][c] == 1) {
                        ctx.fillRect(x, y, bw, bh);
                    }
                    x += bw;
                }
                y += bh;
            }
        }
    }

    const showError = (canvas, errorText1, errorText2) => {
        canvas.width = 238;
        canvas.height = 100;

        const ctx = canvas.getContext('2d');

        ctx.font = "14px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(errorText1, 30, 35);
        ctx.fillText(errorText2, 30, 55);
    }

    useEffect(() => {
        updateCanvas();
    }, [encodedText]);

    return (
        <canvas className="uplatnica__barcode" ref={canvasRef} />
    );
};
