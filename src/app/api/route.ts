import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {

    const listMembers = [
        { studentId: "66024xxx", name: "TestAAAS" },
        { studentId: "66024xxx", name: "TestCCC" },
        { studentId: "66024xxx", name: "TestBBB" }
    ];

    return NextResponse.json({ message: "get group member success", data: listMembers });

}