import { handleJsonp } from "@/lib/handleJsonp";
import { addError, getErrors } from "@/lib/errorLog";

export async function GET(request: Request) {
    return handleJsonp(request, {
        success: true,
        message: "OK",
        data: {
            errors: getErrors(),
        },
    });
}

export async function POST(request: Request) {

    const data = await request.json();
    console.log(data);
    if (!data.error) {
        return handleJsonp(request, {
            success: false,
            message: "No error provided",
        });
    }

    addError(data.error);

    return handleJsonp(request, {
        success: true,
        message: "Error logged",
    });
}
