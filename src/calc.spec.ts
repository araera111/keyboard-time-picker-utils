describe('calcAge', () => {
  it('case 今日2022-12-12 誕生日1991-01-01 -> 31歳11か月', () => {
    const today = '2022-12-12 00:00:00';
    const target = '1991-01-01 00:00:00';
    const result = {
      years: 31,
      months: 11
    };
    expect(calcAge()).toBe();
  });
});
