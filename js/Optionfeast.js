(function () {
    // Hàm so sánh ngày (chỉ so sánh ngày, tháng, năm)
    function isSameDate(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    // Hàm tính toán các ngày lễ riêng (calculateOptionFeasts)
    function calculateOptionFeasts(inputDate) {
        const OptionFeasts = [];

        // Lấy năm từ đối tượng Date
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth(); // Lấy tháng từ inputDate

        // Hàm để đảm bảo date luôn là đối tượng Date
        function parseDate(date) {
            return (date instanceof Date) ? date : new Date(date);
        }
        // Lấy ngày Phục Sinh
        const easterDate = getEasterDate(year);

        // Tính ngày Thứ Tư Lễ Tro (46 ngày trước Phục Sinh)
        const ashWednesday = new Date(easterDate);
        ashWednesday.setDate(easterDate.getDate() - 46);

        // Tính ngày Lễ Chúa Thánh Thần (49 ngày sau Phục Sinh)
        const pentecost = new Date(easterDate);
        pentecost.setDate(easterDate.getDate() + 49);

        // Hàm kiểm tra xem một ngày có nằm trong khoảng từ Thứ Tư Lễ Tro tới Lễ Chúa Thánh Thần không
        function isBetweenAshWednesdayAndPentecost(date) {
            return date >= ashWednesday && date <= pentecost;
        }
        // Lấy ngày chủ nhật đầu tiên của tháng 10
        const firstSundayOfOctober = parseDate(getFirstSundayOfOctober(year));

        // Lấy ngày chủ nhật cuối cùng của năm
        const endSundayOfYear = parseDate(getEndSundayOfYear(year));

        // Tính các ngày lễ
        OptionFeasts.push({ name: 'Bổn mạng Đức Giám mục Giáo Phận.', date: new Date(year, 7, 8) });
        OptionFeasts.push({ name: 'Ngày thụ phong Giám mục của Đức Giám mục Giáo Phận (2017). Ngày Giỗ Cha Giuse Định (+2015)', date: new Date(year, 4, 31) });
        OptionFeasts.push({ name: 'Ngày giỗ Đức Cố Giám mục Bartôlômêô (+2003).', date: new Date(year, 5, 9) });
        OptionFeasts.push({ name: 'Ngày giỗ Đức Cố Giám mục Simon Hòa (+1973).', date: new Date(year, 8, 5) });
        OptionFeasts.push({ name: 'Ngày Đức Cha Antôn nghỉ hưu (2019).', date: new Date(year, 8, 14) });
        OptionFeasts.push({ name: 'Ngày thụ phong Giám mục của Đức Cha Antôn.', date: new Date(year, 9, 1) });
        OptionFeasts.push({ name: 'Kỷ niệm ngày thiết lập Giáo phận (24 và 27.11.1960).', date: new Date(year, 10, 24) });
        OptionFeasts.push({ name: 'Ngày Giỗ Cha Cố Phêrô Trần Đình (+2005).', date: new Date(year, 1, 12) });
        OptionFeasts.push({ name: 'Bổn mạng Giới Gia Trưởng, Cha Đạt và Cha Chính.', date: new Date(year, 2, 19) });
         OptionFeasts.push({ name: 'Bổn mạng Cha Hội.', date: new Date(year, 5, 29) });
        OptionFeasts.push({ name: 'Bổn mạng Đức Cha Antôn, Cha Hiến.', date: new Date(year, 5, 13) });
        OptionFeasts.push({ name: 'Bổn mạng Giáo lý viên Chân Phước Anrê Phú Yên.', date: new Date(year, 6, 26) });
         OptionFeasts.push({ name: 'Bổn mạng HĐGX Thánh Antôn Nguyễn Tiến Đích.', date: new Date(year, 7, 12) });
        OptionFeasts.push({ name: 'Bổn mạng Giáo Họ.', date: new Date(year, 7, 15) });
        OptionFeasts.push({ name: 'Bổn mạng Giới Hiền Mẫu.', date: new Date(year, 7, 27) });
        OptionFeasts.push({ name: 'Ngày Giỗ Cha Cố Matthuê Đinh Viết Hoàng (+2023).', date: new Date(year, 8, 26) });

   
            // Gọi hàm để lấy ngày Chủ Nhật thứ nhất Mùa Vọng
            const firstSundayOfAdvent = getFirstSundayOfAdvent(year);

            // Gọi hàm lấy ngày Tết Âm Lịch
            const lunarNewYearArray = getSolarDate(1, 1, year); // Lấy mảng trả về (ngày, tháng)
            const lunarNewYear = new Date(year, lunarNewYearArray[1] - 1, lunarNewYearArray[0]); // Sử dụng ngày và tháng từ mảng

            const lunarNewYearStart = new Date(lunarNewYear);
            lunarNewYearStart.setDate(lunarNewYear.getDate()-3); // Lùi lại 5 ngày trước Tết

            const lunarNewYearEnd = new Date(lunarNewYear);
            lunarNewYearEnd.setDate(lunarNewYear.getDate() + 5); // Cộng thêm 2 ngày để bao gồm 3 ngày Tết

            function isDuringLunarNewYear(date) {
                return date >= lunarNewYearStart && date <= lunarNewYearEnd;
            }

for (let m = 0; m < 12; m++) {
    let firstFriday = getFirstSpecificDayOfMonth(year, m, 5); // Thứ Sáu đầu tiên

    console.log(`Tháng: ${m + 1}, Ngày Thứ Sáu đầu tiên: ${firstFriday}`);

    // Kiểm tra khoảng Thứ Tư Lễ Tro đến Lễ Chúa Thánh Thần
    if (!isBetweenAshWednesdayAndPentecost(firstFriday)) {

        // Loại bỏ tháng 1 và tháng 10 cho Đàng Thánh Giá
        if (m !== 9 && m !== 0) {

            // Kiểm tra riêng tháng 11, bỏ qua nếu Thứ Sáu đầu tiên là ngày 1
            if (m === 10 && firstFriday.getDate() === 1) {
                  continue;
            }

            // Thêm Đàng Thánh Giá nếu:
            // - Trước Chủ Nhật đầu tiên của Mùa Vọng
            // - Không trong khoảng Tết Âm Lịch
            if (firstFriday < firstSundayOfAdvent && !isDuringLunarNewYear(firstFriday)) {
                OptionFeasts.push({ name: "Chiều 16 giờ 45 Đàng Thánh Giá", date: firstFriday });
       }
        }
    }
}





        // Lọc ra các ngày lễ trùng với ngày truyền vào
        const matchingFeasts = OptionFeasts.filter(feast => isSameDate(feast.date, inputDate));

        // Trả về các ngày lễ trùng với ngày truyền vào
        return matchingFeasts;
    }
    // Hàm tìm Chủ nhật đầu tiên của một tháng
    function getFirstSundayOfMonth(year, month) {
        let date = new Date(year, month, 1);
        while (date.getDay() !== 0) { // 0 là Chủ nhật
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    // Hàm tìm Chủ nhật cuối cùng của một tháng
    function getLastSundayOfMonth(year, month) {
        let date = new Date(year, month + 1, 0); // Lấy ngày cuối cùng của tháng
        while (date.getDay() !== 0) { // 0 là Chủ nhật
            date.setDate(date.getDate() - 1);
        }
        return date;
    }

    // Hàm tính ngày cụ thể đầu tiên của tháng (ví dụ: thứ Năm, thứ Sáu đầu tháng)
    function getFirstSpecificDayOfMonth(year, month, dayOfWeek) {
        let date = new Date(year, month, 1);
        while (date.getDay() !== dayOfWeek) { // Tìm đến đúng thứ trong tuần (dayOfWeek)
            date.setDate(date.getDate() + 1);
        }
        return date;
    }
    // Hàm tính chủ nhật đầu tháng 10
    function getFirstSundayOfOctober(year) {
        let firstDayOfOctober = new Date(year, 9, 1);
        let firstSundayOfOctober = firstDayOfOctober;
        if (firstDayOfOctober.getDay() !== 0) { 
            let daysUntilSunday = 7 - firstDayOfOctober.getDay();
            firstSundayOfOctober = new Date(year, 9, 1 + daysUntilSunday);
        }
        return firstSundayOfOctober;
    }

    // Tính Chủ nhật cuối năm
    function getEndSundayOfYear(year) {
        let lastDayOfYear = new Date(year, 11, 31); // 31 tháng 12 của năm

        let christmasDay = new Date(year, 11, 25);
        if (christmasDay.getDay() === 0) { 
            return new Date(year, 11, 30);
        }

        while (lastDayOfYear.getDay() !== 0) { 
            lastDayOfYear.setDate(lastDayOfYear.getDate() - 1);
        }

        return lastDayOfYear;
    }

    // Đưa hàm calculateOptionFeasts ra ngoài phạm vi toàn cục
    window.calculateOptionFeasts = calculateOptionFeasts;
})();
