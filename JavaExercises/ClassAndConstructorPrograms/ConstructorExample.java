package JavaExercises.ClassAndConstructorPrograms;

class Car {
    String brand;

    Car() {
        brand = "Toyota";
        System.out.println("Car brand is " + brand);
    }
}

public class ConstructorExample {
    public static void main(String[] args) {
        Car car1 = new Car();
    }
}
