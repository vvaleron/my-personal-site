appContainer.
  controller('blocks-controller', ['$scope', function($scope) {
    		console.log("blocks-controller", this);

        var game = $('.blocks .wrapper'),
            id = 'item',
            items = game.children(),
            utils = {},
            rows = 4,
            columns = 4,
            currentRow = 0,
            currentColumn = 0;

        items.each(function(index, el){
            currentColumn += 1;
            currentRow = Math.ceil( (index+1)/rows );
            if(currentColumn > columns) currentColumn = 1;
              var currentCls = 'column' + currentColumn + ' row' + currentRow;

            $(el).data('position',{column: currentColumn, row: currentRow})
                  .addClass('empty ' + currentCls);
        });

        utils.getEmpty = function(){
            var emptyItems = $(game).children('.empty'),
                index = Math.floor(Math.random()*emptyItems.length);
            return emptyItems[index];
        };

        utils.showNew = function(){
            var el = utils.getEmpty(),
                emptyItems = $(game).children('.empty'),
                values = [2, 4];

            if(!emptyItems.length){
                alert('Game Over, sorry bro.');
                return
            }
            
            var top = $(el).position().top,
                left = $(el).position().left;

            $(el).append("<span style='top:"+top+"px; left:"+left+"px;'>"+values[0]+"</span>");
            $(el).removeClass('empty').addClass('visible');
        };

        utils.getVerticalEndPoint = function(position, isUp){
            var emptyEls = $('.column' + position.column + '.empty');

            return isUp ? emptyEls.first() : emptyEls.last();
        };

        utils.getHorizontalEndPoint = function(position, isLeft){
            var emptyEls = $('.row' + position.row + '.empty');

            return isLeft ? emptyEls.first() : emptyEls.last();
        };

        utils.getHorizontalPrevPoint = function(el, isLeft){
          var sufix = $(el).data('position').row;

          return isLeft ?
            $(el).prevAll('.row' + sufix + '.visible').first()
          :
            $(el).nextAll('.row' + sufix + '.visible').first();
        };

        utils.getVerticalPrevPoint = function(el, isUp){
          var sufix = $(el).data('position').column;

          return isUp ?
            $(el).prevAll('.column' + sufix + '.visible').first()
          :
            $(el).nextAll('.column' + sufix + '.visible').first();
        };

        utils.processMoving = function(el, endPoint, prevPoint, isLastPoint){
          var position = $(el).data('position'),
              prevPointVal = parseInt(prevPoint.children().text()),
              currentVal = parseInt($(el).children().text()),
              spanEl = $(el).children().first();

              if (prevPointVal === currentVal){
                spanEl.animate({
                  top: prevPoint.position().top, left: prevPoint.position().left}, 
                  400, 
                  "swing", 
                  function() {
                    $(this).remove();
                });
                $(el).removeClass('visible').addClass('empty');

                prevPoint.children().text(currentVal + prevPointVal);
              }
              else if (!endPoint.length){
                  return
              }
              else if (isLastPoint){
                spanEl.prependTo(endPoint).animate({
                  top: endPoint.position().top,
                  left: endPoint.position().left
                });
                $(el).removeClass('visible').addClass('empty');
                endPoint.removeClass('empty').addClass('visible');

              }
        };

        utils.moveHorizontal = function(el, isLeft){
          var position = $(el).data('position'),
              endPoint = utils.getHorizontalEndPoint(position, isLeft),
              prevPoint = utils.getHorizontalPrevPoint(el, isLeft),
              endPointPosition = endPoint.data('position'),
              isLastPoint = isLeft  ? endPointPosition && endPointPosition.column < position.column
                                    : endPointPosition && endPointPosition.column > position.column;
              

              utils.processMoving(el, endPoint, prevPoint, isLastPoint);
        };

        utils.moveVertical = function(el, isUp){
          var position = $(el).data('position'),
              endPoint = utils.getVerticalEndPoint(position, isUp),
              prevPoint = utils.getVerticalPrevPoint(el, isUp),
              endPointPosition = endPoint.data('position'),
              isLastPoint = isUp ? endPointPosition && endPointPosition.row < position.row
                                 : endPointPosition && endPointPosition.row > position.row;
              

              utils.processMoving(el, endPoint, prevPoint, isLastPoint);
        };

        utils.moveUp = function(){
            var els = $('.wrapper div.visible');
            els.each(function(index, el){
              var position = $(el).data('position');

              if(position.row != 1){
                utils.moveVertical(el, true);
              }
            });
        };

        utils.moveDown = function(){
            var els = $('.wrapper div.visible').get().reverse();
            $(els).each(function(index, el){
              var position = $(el).data('position');

              if(position.row != 4){
                utils.moveVertical(el, false);
              }
            });
        };

        utils.moveLeft = function(){
            var els = $('.wrapper div.visible');
            $(els).each(function(index, el){
              var position = $(el).data('position');

              if(position.column != 1){
                utils.moveHorizontal(el, true);
              }
            });
        };


        utils.moveRight = function(){
            var els = $('.wrapper div.visible').get().reverse();
            $(els).each(function(index, el){
              var position = $(el).data('position');

              if(position.column != 4){
                utils.moveHorizontal(el, false);
              }
            });
        };

        utils.move = function(side){
            switch(side){
                case 'up': 
                    utils.moveUp();
                    break;
                case 'left':
                    utils.moveLeft();
                    break;
                case 'down':
                    utils.moveDown();
                    break;
                case 'right':
                    utils.moveRight();
                    break;
            };
        };

        $('.blocks .control button').on('click', function(){
            var cls = this.getAttribute('class'),
                side = cls.replace('move-','');
            utils.showNew();
            utils.move(side);
        });
      
      $(document).keydown(function(e){
        var side;
          
          switch(e.keyCode) {
            case 37: 
              side = 'left';
              break;
            case 38:
              side = 'up';
              break;
            case 39:
              side = 'right';
              break;
            case 40:
              side = 'down';
              break;
          }

          if (side) {
            utils.showNew();
            utils.move(side);
          }

      });

    }])