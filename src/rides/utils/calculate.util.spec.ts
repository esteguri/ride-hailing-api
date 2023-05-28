import { Calculate } from './calculate.util';

describe('CalculateUtil', () => {
  it('should calculate the distance between two points', () => {
    const lat1 = 6.310511139197471;
    const lon1 = -75.55838241574932;
    const lat2 = 6.197643156592703;
    const lon2 = -75.58054145851258;

    const distance = Calculate.distance({ lat1, lon1, lat2, lon2 });
    expect(distance).toBe(12.79);
  });

  it('should calculate the duration between two dates', () => {
    const date1 = new Date('2023-01-01 00:00:00');
    const date2 = new Date('2023-01-01 01:30:00');
    const duration = Calculate.duration(date1, date2);
    expect(duration).toBe(90);
  });
});
