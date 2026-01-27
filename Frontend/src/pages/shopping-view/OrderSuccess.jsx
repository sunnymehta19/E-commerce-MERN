import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="max-w-md w-full text-center rounded-2xl">
                <CardContent className="p-8 space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold">
                        Order Placed Successfully
                    </h1>

                    <p className="text-muted-foreground text-sm">
                        Thank you for your purchase. Your order has been confirmed and will
                        be processed shortly.
                    </p>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            className="w-full h-11 cursor-pointer"
                            onClick={() => navigate("/account/")}
                        >
                            View Order
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-11 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Go Back to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderSuccess;
