$(document).ready(function () {
    let callQueue = [];
    const elevators = [
        { id: '#elevator1', currentFloor: 0, busy: false },
        { id: '#elevator2', currentFloor: 0, busy: false },
        { id: '#elevator3', currentFloor: 0, busy: false },
        { id: '#elevator4', currentFloor: 0, busy: false },
        { id: '#elevator5', currentFloor: 0, busy: false }
    ];

    function handleCall(floor) {
        const $button = $(`button[data-floor="${floor}"]`);
        $button.text("waiting").css('background', 'red');
        const availableElevators = elevators.filter(elevator => !elevator.busy);
        if (availableElevators.length > 0) {
            const closestElevator = availableElevators.reduce((prev, current) => {
                return (Math.abs(current.currentFloor - floor) < Math.abs(prev.currentFloor - floor)) ? current : prev;
            });
            moveElevator(closestElevator, floor, $button);
        } else {
            callQueue.push({ floor, button: $button });
        }
    }

    function moveElevator(elevator, targetFloor, $button) {
        const $elevator = $(elevator.id+ "-icon");
        const distance = Math.abs(elevator.currentFloor - targetFloor);
        const travelTime = distance * 2000;
        elevator.busy = true;
        $elevator.find('use').attr('stroke', 'red');
        $elevator.css({
            'transition': `transform ${travelTime}ms linear`,
            'transform': `translateY(${-(targetFloor * 50)}px)`
        });

        setTimeout(function () {
            elevator.currentFloor = targetFloor;
            handleArrival(elevator, $button);
            if (callQueue.length > 0) {
                const nextCall = callQueue.shift();
                moveElevator(elevator, nextCall.floor, nextCall.button);
            }
        }, travelTime);
    }

    function handleArrival(elevator, $button) {
        const $elevator = $(elevator.id+"-icon");
        console.log($elevator)
        // const audio = new Audio('sound.mp3');
        // audio.play();
        $elevator.find('use').attr('stroke', 'green');
        $button.text("arrived").css('background', 'green','color','red');
        setTimeout(function () {
            $elevator.find('use').attr('stroke', 'black');
            elevator.busy = false;
            $button.text("call").css('background', '');
        }, 2000);
    }
    $('.action_btn').on('click', function () {
        const floor = parseInt($(this).data('floor'));
        handleCall(floor);
    });
});
