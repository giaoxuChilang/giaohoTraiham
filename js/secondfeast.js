(function () {
    // Hàm tính toán các ngày lễ vọng (Second Feasts)
    function calculateSecondFeasts(year) {
        const secondFeasts = [];

        // Hàm để đảm bảo date luôn là đối tượng Date
        function parseDate(date) {
            return (date instanceof Date) ? date : new Date(date);
        }

        // Lấy ngày Phục Sinh
        const easterDate = parseDate(getEasterDate(year));

        // Chúa nhật thứ 1 của tháng 10
        let BfirstSunday = parseDate(getFirstSundayOfOctober(year));

        // Chúa nhật kế cuối của tháng 10
        const missionarySunday = parseDate(getSecondLastSundayOfOctober(year));

        let EndSunday = parseDate(getEndSundayOfYear(year));

        // Tính các ngày lễ vọng
        secondFeasts.push({
            name: 'Bắt đầu tuần cầu nguyện cho các kitô hữu hợp nhất.',
            date: new Date(year, 0, 18)
        });

        secondFeasts.push({
            name: 'Kết thúc tuần cầu nguyện cho các kitô hữu hợp nhất.',
            date: new Date(year, 0, 25)
        });

        secondFeasts.push({
            name: 'Chiều: LỄ VỌNG CHÚA THĂNG THIÊN (Tr). Bài đọc như lễ Chính ngày',
            date: new Date(easterDate.getTime() + 41 * 24 * 60 * 60 * 1000)
        });

        secondFeasts.push({
            name: 'Chiều: LỄ VỌNG CHÚA THÁNH THẦN HIỆN XUỐNG (Đ).',
            date: new Date(easterDate.getTime() + 48 * 24 * 60 * 60 * 1000)
        });

        secondFeasts.push({
            name: 'Chiều: LỄ VỌNG THÁNH PHÊRÔ VÀ PHAOLÔ TỒNG ĐỒ (Đ).',
            date: new Date(year, 5, 28)
        });

        secondFeasts.push({
            name: 'Chiều: LỄ VỌNG ĐỨC MẸ HỒN XÁC LÊN TRỜI (Tr)',
            date: new Date(year, 7, 14)
        });

        secondFeasts.push({
            name: 'Chiều: LỄ VỌNG GIÁNG SINH',
            date: new Date(year, 11, 24)
        });

        const christTheKing = parseDate(getChristTheKing(year));

        secondFeasts.push({
            name: 'KÍNH TRỌNG THỂ CÁC THÁNH TỬ ĐẠO VIỆT NAM. (Đ)',
            date: new Date(
                christTheKing.getTime() - 7 * 24 * 60 * 60 * 1000
            )
        }); // One week before Christ the King

        // Chúa nhật đầu tháng 10
        secondFeasts.push({
            name: 'Được kính trọng thể lễ Đức Mẹ Mân Côi (Tr).',
            date: new Date(BfirstSunday.getTime())
        });

        // Chúa nhật kế cuối tháng 10
        secondFeasts.push({
            name: 'Chúa nhật Truyền giáo (Tr). Được cử hành thánh lễ cầu nguyện cho việc rao giảng Tin mừng cho các dân tộc.',
            date: new Date(missionarySunday.getTime())
        });

        const lunarNewYearArray = getSolarDate(1, 1, year);
        // Lấy mảng trả về (ngày, tháng)

        const lunarNewYear = new Date(
            year,
            lunarNewYearArray[1] - 1,
            lunarNewYearArray[0]
        );
        // Sử dụng ngày và tháng từ mảng, thêm năm

        secondFeasts.push({
            name: 'THÁNH LỄ TẤT NIÊN (Tr)',
            date: new Date(
                lunarNewYear.getTime() - 1 * 24 * 60 * 60 * 1000
            )
        });

        const midAutumnArray = getSolarDate(15, 8, year);
        // Lấy mảng trả về (ngày, tháng)

        const midAutumnFestival = new Date(
            year,
            midAutumnArray[1] - 1,
            midAutumnArray[0]
        );
        // Sử dụng ngày và tháng từ mảng, thêm năm

        secondFeasts.push({
            name: 'TRUNG THU, tết thiếu nhi. (Tr)',
            date: new Date(midAutumnFestival.getTime())
        });

        // Tính Vọng Thánh Gioan Tẩy Giả
        const sacredHeartDate = new Date(
            easterDate.getTime() + 68 * 24 * 60 * 60 * 1000
        );
        // Ngày lễ Thánh Tâm

        const june24Date = new Date(year, 5, 24);
        // Ngày 24/6

        if (june24Date.getTime() === sacredHeartDate.getTime()) {
            secondFeasts.push({
                name: 'Chiều: LỄ VỌNG THÁNH GIOAN BAOTIXITA',
                date: new Date(year, 5, 22)
            });
        } else {
            secondFeasts.push({
                name: 'Chiều: LỄ VỌNG THÁNH GIOAN BAOTIXITA',
                date: new Date(year, 5, 23)
            });
        }

        return secondFeasts;
    }

    // Tính Chúa nhật đầu tháng 10
    function getFirstSundayOfOctober(year) {
        // Ngày 1 tháng 10
        let firstDayOfOctober = new Date(year, 9, 1);

        // Nếu 1/10 không phải Chúa nhật,
        // tìm Chúa nhật tiếp theo
        let firstSundayOfOctober = firstDayOfOctober;

        if (firstDayOfOctober.getDay() !== 0) {
            let daysUntilSunday = 7 - firstDayOfOctober.getDay();

            firstSundayOfOctober = new Date(
                year,
                9,
                1 + daysUntilSunday
            );
        }

        return firstSundayOfOctober;
    }

    // Tính Chúa nhật kế cuối tháng 10
    function getSecondLastSundayOfOctober(year) {
        // Ngày cuối cùng của tháng 10
        const lastDayOfOctober = new Date(year, 9, 31);

        // getDay():
        // 0 = Chúa nhật
        // 1 = Thứ hai
        // ...
        // 6 = Thứ bảy
        const daysBackToSunday = lastDayOfOctober.getDay();

        // Tìm Chúa nhật cuối cùng của tháng 10
        const lastSundayOfOctober = new Date(
            year,
            9,
            31 - daysBackToSunday
        );

        // Chúa nhật kế cuối = Chúa nhật cuối - 7 ngày
        const secondLastSundayOfOctober = new Date(
            year,
            9,
            lastSundayOfOctober.getDate() - 7
        );

        return secondLastSundayOfOctober;
    }

    function getEndSundayOfYear(year) {
        // Ngày cuối cùng của năm
        let lastDayOfYear = new Date(year, 11, 31);

        // Kiểm tra nếu là ngày 25/12 thì trả về 30/12
        if (
            lastDayOfYear.getDate() === 25 &&
            lastDayOfYear.getMonth() === 11
        ) {
            return new Date(year, 11, 30);
        }

        // Tìm ngày Chúa nhật gần nhất về trước
        // hoặc trùng với ngày 31 tháng 12
        while (lastDayOfYear.getDay() !== 0) {
            lastDayOfYear.setDate(
                lastDayOfYear.getDate() - 1
            );
        }

        return lastDayOfYear;
    }

    // Đưa hàm calculateSecondFeasts ra ngoài phạm vi toàn cục
    window.calculateSecondFeasts = calculateSecondFeasts;
})();
